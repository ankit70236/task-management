import { Minus, RotateCcw, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { decrement, increment, reset } from '@/features/counter/counterSlice'

export function CounterCard() {
  const dispatch = useAppDispatch()
  const count = useAppSelector((state) => state.counter.value)

  return (
    <div className="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
      <h2 className="text-lg font-medium">Redux Toolkit wired up</h2>
      <p className="mt-2 text-muted-foreground">
        This sample feature module confirms store setup and typed hooks are ready.
      </p>
      <p className="mt-4 text-2xl font-semibold">{count}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        <Button type="button" onClick={() => dispatch(decrement())} variant="outline">
          <Minus /> Decrement
        </Button>
        <Button type="button" onClick={() => dispatch(increment())}>
          <Plus /> Increment
        </Button>
        <Button type="button" onClick={() => dispatch(reset())} variant="secondary">
          <RotateCcw /> Reset
        </Button>
      </div>
    </div>
  )
}
