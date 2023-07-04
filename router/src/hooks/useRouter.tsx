const useRouter = () => {
  const push = (to: string, state?: { [index: string]: unknown }) => {
    history.pushState(state, "", to);

    const popstateEvent = new PopStateEvent("popstate", state);
    window.dispatchEvent(popstateEvent);
  };

  return { push };
};

export default useRouter;
