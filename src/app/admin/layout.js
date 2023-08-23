import TopNavBar from "@/app/components/users/quiz/TopNavBar"

export default function Layout({ children }) {
    return (
      <>
        <TopNavBar />
        {children}
      </>
    )
  }