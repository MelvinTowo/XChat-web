'use client'
import useConversation from '@/app/hooks/useConversation'
import useRoutes from '@/app/hooks/useRoutes'
import React from 'react'
import MobileItem from './Mobileitem'
const MobileFooter = () => {
    const routes = useRoutes()
    const {isOpen} = useConversation()

    //not showing this mobile footer if the user has selected a conversation
    if(isOpen){
        return null
    }
    return (
        <div
        className='
            fixed
            justify-between
            w-full
            bottom-0
            z-40
            flex
            items-center
            bg-white
            border-t-[1px]
            lg:hidden
        '>{routes.map((route) => (
            <MobileItem 
            key={route.href}
            href={route.href}
            active={route.active}
            icon={route.icon}
            onClick={route.onClick}
            />
        ))}</div>
    )
}

export default MobileFooter