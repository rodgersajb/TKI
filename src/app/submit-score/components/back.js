
export default function BackNine({hole, score}) {
    return (
      <>
        <div className="flex flex-col w-1/6 text-center py-2">
          <span className="bg-kobePurple py-1 text-kobeWhite">{hole.number}</span>
          <span className="bg-kobeWhite py-1">{score[hole.number]}</span>
        </div>
      </>
    );
}