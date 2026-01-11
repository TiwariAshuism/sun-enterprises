import Link from 'next/link';

export default function NotFound() {
    return (
        <main className="flex-grow flex flex-col justify-center items-center px-6 py-12 md:py-24 min-h-[60vh]">
            <div className="max-w-[800px] w-full text-center flex flex-col items-center">
                {/* Large Minimal 404 Text */}
                <h1 className="text-[#1c180d]/10 dark:text-[#fcfbf8]/10 text-[120px] md:text-[220px] font-thin leading-none select-none tracking-tighter">
                    404
                </h1>
                {/* Headline and Subtext Container */}
                <div className="mt-[-20px] md:mt-[-40px] z-10">
                    <h2 className="text-3xl md:text-5xl font-black leading-tight tracking-[-0.033em] text-[#1c180d] dark:text-[#fcfbf8] mb-6">
                        Looking for something under the sun?
                    </h2>
                    <p className="text-[#9c8749] text-base md:text-xl font-normal leading-relaxed max-w-[600px] mx-auto mb-10">
                        The page you’re looking for isn’t here, but our mission to power the future of farming remains.
                    </p>
                </div>
                {/* Call to Action */}
                <Link
                    href="/"
                    className="group flex items-center gap-2 text-primary text-lg font-semibold transition-all hover:gap-4 underline-offset-8 decoration-2"
                >
                    <span>Go back home</span>
                    <span className="material-symbols-outlined">arrow_forward</span>
                </Link>
            </div>
        </main>
    );
}
