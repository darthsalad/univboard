import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import PageLoader from '@/components/Loader/Loader'
import { useAuthStore } from '@/lib/zustand.store'

type TChildren = {
  children: React.ReactNode
}

const IsUser = ({ children }: TChildren) => {
  const router = useRouter()
  const { isLoggedIn } = useAuthStore(state => ({
    isLoggedIn: state.isLoggedIn
  }))
  const { data, isLoading, isError } = useQuery({
    queryKey: ['auth'],
    queryFn: () => {
      if (isLoggedIn) {
        router.push('/');
      } else {
        return null;
      }
    }
  });

  if (isLoading) {
    return <PageLoader />
  }

  return (
    <div>{children}</div>
  )
}

export default IsUser