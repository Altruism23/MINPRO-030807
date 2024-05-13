import Image from 'next/image'
import styles from './page.module.css'
import { getSession } from '@/lib/session'

export default async function Home() {
  const session = await getSession()
 return (
  <div>
    Hello
    <h1>
      {session?.username}
    </h1>
  </div>
 )
}
