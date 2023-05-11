import PageLoader from '@/components/Loader/Loader';
import { useQuery } from '@tanstack/react-query';
import React from 'react'

const baseURL = process.env.NEXT_PUBLIC_API_URL

type TChildren = {
  children: React.ReactNode
}

const Protected = ({ children }: TChildren) => {
  const [isAuth, setIsAuth] = React.useState(false);
  const { data, isLoading, isError } = useQuery({
    queryKey: ['auth'],
    queryFn: () => fetch(`${baseURL}/auth`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => res.json())
      // .then(data => {
      //   if (data.status === 'success') {
      //     setIsAuth(true);
      //   }
      // })
      .then((data) => console.log(data))
  });

  if (isLoading) {
    return <PageLoader />
  }
    
  return (
    <div>
      {children}
    </div>
  )
}

export default Protected