
function nestedDivs(index: number = 0) {
    return (
        <div className={`FinishFlag-s FinishFlag-s${index}`}>
            { index < 24 ? nestedDivs(index + 1) : <></> }
        </div>
    );
}

export default function FinishFlag() {
  return (
    <div className="FinishFlagWrapper">
        { nestedDivs() }
    </div>
  );
}