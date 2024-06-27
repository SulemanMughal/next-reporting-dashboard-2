import Image from 'next/image';
// import WebIcon from '@/app/components/WebIcon';
import Link from "next/link";


import URL_PATTERNS from "@/app/lib/urlpatterns";

const NOT_FOUND_404_IMAGE = () => {
    return (
        <Image src={`/assets/img/404_2.gif`} alt="me" width={500} height={500}  unoptimized={true} />
    )
}

function NotFound() {
    return (
        <section>
            <div className="container mx-auto">
                <div className='not-found-2'>
                    <div className="not-found-1">
                        <NOT_FOUND_404_IMAGE />
                    </div>
                </div>
                <div className="text-center">
                    <Link href={URL_PATTERNS?.HOME} className="back-btn">
                        {`Go back to home`}
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default NotFound

