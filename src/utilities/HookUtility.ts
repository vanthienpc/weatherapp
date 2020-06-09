import {
  useSelector as originalUseSelector,
  useDispatch as originalUseDispatch,
  RootStateOrAny,
  TypedUseSelectorHook,
} from 'react-redux';

export const useSelector: TypedUseSelectorHook<RootStateOrAny> = (state: RootStateOrAny) =>
  originalUseSelector(state);
export const useDispatch = () => originalUseDispatch();
