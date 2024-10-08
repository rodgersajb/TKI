export default function FrontNine({ hole, score, netScore }) {
  return (
    <>
    

      <div className="flex flex-col w-1/6 text-center">
        <span className="py-1 bg-kobeYellow text-kobePurple font-bold">{hole.number}</span>
        <span className="py-1 bg-kobeWhite">{score[hole.number]}</span>
        <span className="py-1 bg-kobeWhite">{netScore[hole.number]}</span>
      </div>
    
    </>
  );
}
