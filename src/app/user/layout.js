import TopNavBar from "@/app/components/users/quiz/TopNavBar"



export default function Layout({ children }) {
    // const { data, error } = useSWR('/api/navigation', fetcher)
   
    // if (error) return <div>Failed to load</div>
    // if (!data) return <div>Loading...</div>
   
    return (
      <>
        <TopNavBar />
        <div className="mx-10 px-3 py-5 bg-dark-navy-blue rounded-3xl mb-10">
          {children}
        </div>
      </>
    )
  }