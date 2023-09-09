import prisma from '@/app/libs/prismadb'
import getSession from './getSession'

const getUsers = async () => {
 
    const session = await getSession()

    if (!session?.user?.email){
        return []
    }
    try {
        //Ordering all the users by the newest
        const users = await prisma.user.findMany({
            orderBy: {
                createdAt: 'desc'
            }, 
            // Finding all the users where the email is not equal to our own
            where: {
                NOT: {
                    email: session.user.email
                }
            }
        })
    } catch (error: any) {
        return []
    }
    
}

export default getUsers