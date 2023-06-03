import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import PageLoader from '@/components/Loader/Loader'
import { useAuthStore } from '@/lib/zustand.store'
import { set } from 'mongoose'

type TChildren = {
  children: React.ReactNode
}

const IsUser = ({ children }: TChildren) => {
  const router = useRouter()
  const [loading, setLoading] = React.useState(true)
  const { isLoggedIn } = useAuthStore(state => ({
    isLoggedIn: state.isLoggedIn
  }))
 
  React.useEffect(() => {
    if (isLoggedIn) {
      router.push('/');
    }
    setLoading(false);
  }, [])

  if (loading) {
    return <PageLoader />
  }

  return (
    <div>{children}</div>
  )
}

export default IsUser