'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { useContext, useRef } from 'react'
import { LayoutRouterContext } from 'next/dist/shared/lib/app-router-context.shared-runtime'

function FrozenRouter(props: { children: React.ReactNode }) {
  const context = useContext(LayoutRouterContext ?? {}) // 使用 useContext 钩子获取当前的 LayoutRouterContext 上下文值。如果 LayoutRouterContext 为空，则使用空对象。
  const frozen = useRef(context).current // 使用 useRef 创建一个持久化的引用来存储 context，并通过 current 属性获取其当前值，这样可以确保 context 在组件的整个生命周期内保持不变。
  // 将冻结的 context 作为值传递给 LayoutRouterContext.Provider，以确保子组件在页面切换过程中能够使用一致的上下文。
  return <LayoutRouterContext.Provider value={frozen}>{props.children}</LayoutRouterContext.Provider>
}

export const PageTransitionProvider = ({ children }: { children: React.ReactNode }) => {
  const key = usePathname()
  const variants = {
    // hidden: { opacity: 0, x: 200 },
    // enter: { opacity: 1, x: 0 },
    // exit: { opacity: 0, x: 0 },
    hidden: { opacity: 0, x: 100, y: 0 },
    enter: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: -100, y: 0 },
  }

  return (
    <AnimatePresence mode="popLayout">
      <motion.div
        key={key}
        data-scroll
        className="mb-auto h-full"
        initial="hidden"
        animate="enter"
        exit="exit"
        variants={variants}
        transition={{ duration: 0.3, ease: 'easeInOut' }}>
        <FrozenRouter>{children}</FrozenRouter>
      </motion.div>
    </AnimatePresence>
  )
}
