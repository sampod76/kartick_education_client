import styles from './loading.module.css';

const LoadingForDataFetch = () => {
    return (
        <div className='flex justify-center items-center min-h-[80vh] w-full'>

            <div id={styles.page}>
                <div id={styles.container}>
                    <div id={styles.ring}></div>
                    <div id={styles.ring}></div>
                    <div id={styles.ring}></div>
                    <div id={styles.ring}></div>
                    <div id={styles.h3}><div className="text-2xl font-bold loading-text">
                        <span className="animate-pulse">L</span>
                        <span className="animate-pulse">O</span>
                        <span className="animate-pulse">A</span>
                        <span className="animate-pulse">D</span>
                        <span className="animate-pulse">I</span>
                        <span className="animate-pulse">N</span>
                        <span className="animate-pulse">G</span>

                    </div></div>
                </div>
            </div>
        </div>
    );

};

export default LoadingForDataFetch;