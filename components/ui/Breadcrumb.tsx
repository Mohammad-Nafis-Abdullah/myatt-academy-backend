import * as React from 'react' 
import { usePathname } from 'next/navigation'

interface BreadcrumbProps {
    children: (props: {paths: string[], routeTo: (index: number) => void}) => React.ReactNode; 
}

export const BreadcrumbWrapper:React.FC<BreadcrumbProps> = ({children}) => {
    const pathname = usePathname(); 

    if(pathname === '/'){
        return null;
    } 

    const paths = pathname.split('/').filter((path) => path !== ''); 

    const routeTo = (index: number) => {
        return paths.slice(0, index + 1).join('/') as string; 
    }

    return children({paths, routeTo})  
}
 