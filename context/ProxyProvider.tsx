/* eslint-disable react/react-in-jsx-scope */
import {ApisauceInstance, create} from 'apisauce';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  cleanUrl,
  getAuthQueryStringParams,
  getPaginationQueryStringParams,
} from '../helpers/handleUrl';

type MarvelHeroesListResponse = {
  code: number;
  data: {
    results: MarvelHeroData[]; // Aquí tipamos los resultados de héroes
  };
  //TODO: tipar las respuestas de API para listado de héroes
};

type MarvelHeroComicsListResponse = {
  code: number;
  data: {
    results: MarvelComicData[]; // Aquí tipamos los resultados de héroes
  };
  //TODO: tipar las respuestas de API para listado de cómics de un héroe
};

type MarvelResponse = MarvelHeroesListResponse | MarvelHeroComicsListResponse;

type MarvelHeroData = Array<{
  thumbnail: {path: string; extension: string};
}>; //TODO tipar los datos de héroes
type MarvelComicData = Array<{}>; //TODO: tipar los datos de cómics
type MarvelData = MarvelHeroData | MarvelComicData;

type ContextStateUninitialized = {
  url?: undefined;
  isFetching: false;
  data?: undefined;
};

type ContextStateInitialized = {
  url: string;
  isFetching: false;
  //data?: undefined;
  data?: [];
};

type ContextStateFetching<T> = {
  url: string;
  isFetching: true;
  data?: T;
};

type ContextStateFetched<T> = {
  url: string;
  isFetching: boolean;
  data: T;
  apisauceInstance?: ApisauceInstance;
};

type ApiRequestContextState<T> =
  | ContextStateUninitialized
  | ContextStateInitialized
  | ContextStateFetching<T>
  | ContextStateFetched<T>;

interface IActions {
  paginate: (urlNavigate: string) => void;
  cleanState: (urlNavigate: string) => void;
  logOut: () => void;
}

const initialState = {
  isFetching: false,
};

type Props = {
  url: string;
  maxResultsPerPage: number;
  children: JSX.Element;
};

type ProxyHandler<T, P extends string> = {
  get?(target: T, p: P, receiver: any): any;
  set?(
    target: {results: {[key in P]?: T}},
    p: P,
    value: any,
    receiver: any,
  ): boolean;
};

declare const Proxy: {
  new <T extends object>(
    target: {results: {[key in string]?: T}; apiInstance: ApisauceInstance},
    handler: ProxyHandler<T, string>,
  ): {[key: string]: Promise<T>};
};

const marvelProxy = new Proxy<MarvelResponse>(
  {
    apiInstance: create({baseURL: 'https://gateway.marvel.com'}),
    results: {},
  },
  {
    get: function <T extends MarvelResponse>(
      target: {
        results: {
          [key in string]?: MarvelHeroData[] | MarvelComicData[];
        };
      },
      url: string,
    ) {
      if (url === 'clearCache') {
        target.results = {};
        return;
      }

      const values = target;
      const absoluteUrl = cleanUrl(url);

      return new Promise<MarvelHeroData[] | MarvelComicData[]>(
        async (resolve, reject) => {
          if (values.results.hasOwnProperty(absoluteUrl)) {
            resolve(values.results[absoluteUrl]!);
            return;
          }

          try {
            const response = await (
              target as {
                results: {
                  [key in string]?: T;
                };
                apiInstance: ApisauceInstance;
              }
            ).apiInstance.get<T>(url);
            const {data} = response;

            if (data?.code !== 200 || !data) {
              throw new Error('Error fetching data');
            }
            //if (response.originalError?.response?.status !== 200 || !data) {
            //  throw new Error('Error fetching data');
            //}

            target.results[absoluteUrl] = data.data.results;

            resolve(data.data.results);
          } catch (e) {
            console.log('error', e);
            reject(e);
          }
        },
      );
    },
    set: (target, url: string, value) => {
      target.results[url] = value;
      return true;
    },
  },
);

export const ApiRequestContext = createContext<
  [ApiRequestContextState<MarvelData>, IActions]
>([
  initialState as ContextStateUninitialized,
  {
    paginate: (_urlNavigate: string) => {},
    cleanState: (_urlNavigate: string) => {},
    logOut: () => {},
  },
]);

export function CachedRequestsProvider({
  children,
  url,
  maxResultsPerPage,
}: Props) {
  const [state, setState] = useState<ApiRequestContextState<MarvelData>>({
    isFetching: false,
    url,
    data: [],
  } as ContextStateInitialized);

  const [pageMap, setPageMap] = useState<Record<string, number>>({
    [url]: 0,
  });
  const [dinamicUrl, setDinamicUrl] = useState(url);
  const navigation = useNavigation();

  const getNavigatableUrl = useCallback((): string => {
    const currentPage = dinamicUrl in pageMap ? pageMap[dinamicUrl] : 0;

    const newUrl = new URL(dinamicUrl);
    Object.entries({
      ...getAuthQueryStringParams(),
      ...getPaginationQueryStringParams(maxResultsPerPage, currentPage),
    }).forEach(param => {
      newUrl.searchParams.append(param[0], param[1]);
    });
    return newUrl.toString().replace(/\/\?/, '?');
  }, [maxResultsPerPage, pageMap, dinamicUrl]);

  useEffect(() => {
    if (state.isFetching || !state.url) {
      return;
    }

    marvelProxy[getNavigatableUrl()]?.then(value => {
      setState({
        ...state,
        isFetching: true,
        data: {
          ...(state.data ?? {}),
          [dinamicUrl]: value,
        },
      } as ContextStateFetched<MarvelData>);
    });
  }, [pageMap, dinamicUrl]);

  const paginate = (urlNavigate: string) => {
    if (!state.isFetching) return;

    setDinamicUrl(urlNavigate);
    setPageMap(prev => ({
      ...prev,
      [urlNavigate]:
        prev[urlNavigate] === undefined ? 0 : prev[urlNavigate] + 1,
    }));
    setState(prevState => ({...prevState, isFetching: false}));
  };

  const cleanState = (urlNavigate: string) => {
    // Al usar el paginador, se hace un ajuste en el contador con -1 para asegurarnos
    // de que la primera página se recupere correctamente desde el cache. Cuando una URL
    // ya tiene datos almacenados en `pageMap`, el contador no debe comenzar desde 0,
    // ya que eso indicaría que es la primera página, pero si ya la habíamos visitado,
    // traeríamos la segunda página. El ajuste de -1 garantiza que la página inicial
    // se obtenga correctamente cuando se realice una nueva solicitud.

    setPageMap(prev => ({
      ...prev,
      [urlNavigate]: -1,
    }));
    setState({
      isFetching: true,
      url,
      data: [],
    });
  };

  const logOut = () => {
    marvelProxy.clearCache;
    setState({
      isFetching: false,
      url,
      data: [],
    });
    setPageMap({
      [url]: 0,
    });
    setDinamicUrl(url);
    navigation.reset({
      index: 0, // Establece la página inicial
      routes: [{name: 'Login'}], // Reemplaza 'Home' por el nombre de tu pantalla inicial
    });
  };

  return (
    <ApiRequestContext.Provider
      value={[
        state,
        {
          paginate,
          cleanState,
          logOut,
        },
      ]}>
      {children}
    </ApiRequestContext.Provider>
  );
}

export const useCachedRequests = (): [
  ApiRequestContextState<MarvelData>,
  IActions,
] => {
  return useContext(ApiRequestContext);
};
