import ClipCard from "@/components/ClipCard/card";

export default function Home() {
  return (
    <div className="card-wrapper">
      {
        [1, 2, 3, 4, 5].map((item) => (
          <ClipCard key={item} />
        ))
      }
    </div>
  )
}
