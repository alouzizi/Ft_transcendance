export default function HomeSection(prompt:{
    sectionName?: string,
    btnName?: string,
    children?: React.ReactNode;

}){
    return(
        <div className="flex flex-col w-2/5 p-2 h-fit ">
            <div className="flex flex-row justify-between mb-4">
                <h1 className="font-bold text-2xl text-gray-400 text-center  h-fit my-auto">{prompt.sectionName ?? "Section Name"}</h1>
                <p className="border-2 border-white p-2 px-4 ml-2 rounded-full text-xs cursor-pointer
                hover:text-gray-400 hover:border-gray-400
                active:text-white active:border-white">{prompt.btnName ?? "See All Section"}</p>
            </div>
            <div className="mb-6 h-[0.05rem] bg-gray-400" />
            {prompt.children}
        </div>
    );
}