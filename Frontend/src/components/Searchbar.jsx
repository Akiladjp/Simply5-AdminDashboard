import { TERipple } from 'tw-elements-react';

export default function Searchbar() {
    return (
            <div className="mb-6 md:w-full flex justify-end">
                <div className=" relative mb-4 flex flex-wrap items-stretch  w-60 border-[rgb(0,127,168)] border-2 rounded-full">
                    <input
                        type="search"
                        className=" h-8 relative m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded-full border-0  bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] outline-none transition duration-200 ease-in-out focus:z-[3]  focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none"
                        placeholder="Search"
                        aria-label="Search"
                        aria-describedby="button-addon1" />

                    {/* <!--Search button--> */}
                    <TERipple color='light'>
                    <button
                        className=" relative z-[2] flex items-center rounded-r bg-primary px-3 py-1.5 text-xs font-medium uppercase leading-tight shadow-md transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg "
                        type="button"
                        id="button-addon1">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="h-5 w-5 text-black bg-transparent">
                            <path
                                fillRule="evenodd"
                                d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                                clipRule="evenodd" />
                        </svg>
                    </button>
                    </TERipple>
                </div>
            </div>
    );
}