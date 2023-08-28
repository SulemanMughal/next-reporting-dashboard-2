import TopNavBar from "@/app/components/users/quiz/TopNavBar"

export default function Layout({ children }) {
    return (
      <>
        <TopNavBar />
        <div className="mx-10 px-3 py-5 bg-dark-navy-blue rounded-3xl mb-10">
          {children}
        </div>
      </>
    )
  }