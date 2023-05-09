import ClipCard from "@/components/ClipCard/ClipCard";

export default function Home() {
  return (
    <div className="card-wrapper">
      {
        [1, 2, 3, 4, 5].map((item) => {
          return <ClipCard key={item} />
        })
      }
    </div>
  )
}
