export default function TweetDetail({ params }: { params: { id: string } }) {
  console.log("params: ", params);
  return (
    <div>
      <h1>TweetDetail</h1>
      <span>{params.id} 페이지입니다</span>
    </div>
  );
}
