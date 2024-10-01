import Image from 'next/image';



export default async function Complete() {
  
  return (
    <div className="h-svh w-full">
      <figure className='relative h-[300px] w-full'>
        <Image src="/img/lake.jpg" alt="Lake" fill />
      </figure>
      <h2>You did it Billy. Now go get em</h2>
      
    </div>
  );
}
