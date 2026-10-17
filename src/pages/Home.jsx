import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">🔗 Shorta</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input placeholder="Cole seu link longo aqui..." />
          <Button className="w-full">Encurtar URL</Button>
        </CardContent>
      </Card>
    </div>
  )
}