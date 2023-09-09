//This component will be used to fetch users directly from the database

import Sidebar from "../components/sidebar/Sidebar"

export default async function UsersLayout(
    {
        children
    }: {
        children: React.ReactNode
    }) {
        return(
            <Sidebar>
                <div className="h-full">
                    {children} 
                </div>
            </Sidebar>
        )
    }