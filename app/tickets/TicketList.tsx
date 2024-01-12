import { Ticket } from "@/types/ticket.types"
import { baseUrl } from "@/utils/baseUrl"
import Link from "next/link"

async function getTickets(): Promise<Ticket[]> {
  try {
    const res = await fetch(`${baseUrl}/tickets`, {
      next: {
        revalidate: 30,
      },
    })

    return res.json()
  } catch (error) {
    throw error
  }
}

export default async function TicketList() {
  const tickets = await getTickets()

  return (
    <>
      {tickets.map((ticket) => (
        <div
          key={ticket.id}
          className='card my-5'>
          <Link href={`/tickets/${ticket.id}`}>
            <h3>{ticket.title}</h3>
            <p>{ticket.body.slice(0, 200)}...</p>
            <div className={`pill ${ticket.priority}`}>
              {ticket.priority} priority
            </div>
          </Link>
        </div>
      ))}
      {tickets.length === 0 && (
        <p className='text-center'>There are no open tickets, yay!</p>
      )}
    </>
  )
}
