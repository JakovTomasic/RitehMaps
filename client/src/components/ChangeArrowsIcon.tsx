
function ChangeArrowsIcon() {

  return (
    <svg 
        className="h-5.5 w-5.5 text-gray-500"  
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        strokeWidth="2" 
        stroke="currentColor" 
        fill="none" 
        strokeLinecap="round" 
        strokeLinejoin="round">  
        <path stroke="none" d="M0 0h24v24H0z"/>  
        <path d="M3 9l4-4l4 4m-4 -4v14" />  
        <path d="M21 15l-4 4l-4-4m4 4v-14" />
    </svg>

    );
}

export default ChangeArrowsIcon;
