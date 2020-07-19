// Type defitions for wouter are generously provided by:
// * Alexander Tolkunov <https://github.com/StrayFromThePath>
// * Maksim Karelov <https://github.com/Ty3uK>

import {
  AnchorHTMLAttributes,
  FunctionComponent,
  PropsWithChildren,
  ComponentType,
  ReactElement,
  ReactNode,
} from "react";

import {
  Path,
  BaseLocationHook,
  HookReturnValue,
  HookNavigationOptions,
  LocationHook,
} from "./use-location";

import { DefaultParams, Params, Match, MatcherFn } from "./matcher";

// re-export types from these modules
export * from "./matcher";
export * from "./use-location";

/*
 * Components: <Route />
 */

export interface RouteComponentProps<T extends DefaultParams = DefaultParams> {
  params: T;
}

export interface RouteProps<T extends DefaultParams = DefaultParams> {
  children?: ((params: Params<T>) => ReactNode) | ReactNode;
  path?: Path;
  component?: ComponentType<RouteComponentProps<T>>;
}

// tslint:disable:no-unnecessary-generics
export function Route<T extends DefaultParams = DefaultParams>(
  props: RouteProps<T>
): ReactElement | null;
// tslint:enable:no-unnecessary-generics

/*
 * Components: <Link /> & <Redirect />
 */

export type NavigationalProps<H extends BaseLocationHook = LocationHook> = (
  | { to: Path; href?: never }
  | { href: Path; to?: never }
) &
  HookNavigationOptions<H>;

export type LinkProps<H extends BaseLocationHook = LocationHook> = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "href"
> &
  NavigationalProps<H>;

export type RedirectProps<
  H extends BaseLocationHook = LocationHook
> = NavigationalProps<H> & {
  children?: never;
};

export function Redirect<H extends BaseLocationHook = LocationHook>(
  props: PropsWithChildren<RedirectProps<H>>, // tslint:disable-line:no-unnecessary-generics
  context?: any
): ReactElement<any, any> | null;

export function Link<H extends BaseLocationHook = LocationHook>(
  props: PropsWithChildren<LinkProps<H>>, // tslint:disable-line:no-unnecessary-generics
  context?: any
): ReactElement<any, any> | null;

/*
 * Components: <Switch />
 */

export interface SwitchProps {
  location?: string;
  children: Array<ReactElement<RouteProps>>;
}
export const Switch: FunctionComponent<SwitchProps>;

/*
 * Components: <Router />
 */

export interface RouterProps {
  hook: BaseLocationHook;
  base: Path;
  matcher: MatcherFn;
}
export const Router: FunctionComponent<
  Partial<RouterProps> & {
    children: ReactNode;
  }
>;

/*
 * Hooks
 */

export function useRouter(): RouterProps;

export function useRoute<T extends DefaultParams = DefaultParams>(
  pattern: Path
): Match<T>; // tslint:disable-line:no-unnecessary-generics

export function useLocation<
  H extends BaseLocationHook = LocationHook
>(): HookReturnValue<H>; // tslint:disable-line:no-unnecessary-generics
