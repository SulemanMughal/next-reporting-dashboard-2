

import NextTopLoader from 'nextjs-toploader';

const TopLoader = () => {
    return (
        <NextTopLoader
            color="#9fef00"
            initialPosition={0.08}
            crawlSpeed={200}
            height={7}
            crawl={true}
            showSpinner={false}
            easing="ease"
            speed={200}
            shadow="0 0 10px #9fef00,0 0 5px #9fef00"
        />
    )
}


export default TopLoader;