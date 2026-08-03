import HomeClient from './homeClient';


export default function Home() {

  const today = new Date()
    .toISOString()
    .split('T')[0];


  return (
    <HomeClient today={today}/>
  );
}