export default ({state, view, handlers, observer}) => {

  const vnode = typeof view.init === 'function' ? view.init() : view

  if (state !== void 0 && observer!==void 0) {
    vnode.data = {
      ...vnode.data,
      hook: {
        create () {
          state.addObserver(observer)
        },
        destroy () {
          state.removeObserver(observer)
        }
      }
    }
  }

  return {
    view,
    handlers,
    observer,
    render: () => vnode
  }
}