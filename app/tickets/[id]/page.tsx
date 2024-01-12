import { Ticket } from "@/types/ticket.types"
import { baseUrl } from "@/utils/baseUrl"
import { notFound } from "next/navigation"

type Props = {
  params: {
    id: number
  }
}

export async function generateStaticParams() {
  const res = await fetch(`${baseUrl}/tickets`)

  const tickets: Ticket[] = await res.json()

  return tickets.map((ticket) => ({
    id: ticket.id,
  }))
}

async function getTicket(id: number): Promise<Ticket> {
  try {
    const res = await fetch(`${baseUrl}/tickets/${id}`, {
      next: {
        revalidate: 60,
      },
    })

    if(!res.ok){
      notFound()
    }

    return res.json()
  } catch (error) {
    throw error
  }
}

export default async function TicketDetails({ params }: Props) {
  const ticket = await getTicket(params.id)
  return (
    <main>
      <nav>
        <h2>Ticket Details</h2>
      </nav>
      <div className='card'>
        <h3>{ticket.title}</h3>
        <small>Created by {ticket.user_email}</small>
        <p>{ticket.body}</p>
        <div className={`pill ${ticket.priority}`}>
          {ticket.priority} priority
        </div>
      </div>
    </main>
  )
}
