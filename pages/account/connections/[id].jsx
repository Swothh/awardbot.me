import { useRouter } from 'next/router'

const CloseWindow = () => {
    const router = useRouter();
    const hasWindow = (typeof window !== 'undefined') ? true : false;
    hasWindow ? window.close() || router.push('/') : null
    return <></>;
}

export default CloseWindow;