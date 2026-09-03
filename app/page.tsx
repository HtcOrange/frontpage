import { ChevronRight, Bell, Search } from 'lucide-react'
import { AppSidebar } from '@/components/platform/app-sidebar'
import { CreateJob } from '@/components/platform/create-job'

export default function Page() {
  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        {/* 顶栏 */}
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between gap-4 border-b border-border bg-background/80 px-4 backdrop-blur sm:px-6">
          <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <span>训练任务</span>
            <ChevronRight className="size-4" />
            <span className="font-medium text-foreground">新建任务</span>
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-2 rounded-lg border border-border bg-card px-3 py-1.5 text-sm text-muted-foreground md:flex">
              <Search className="size-4" />
              <span>搜索任务、模型……</span>
            </div>
            <button
              type="button"
              aria-label="通知"
              className="flex size-9 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:text-foreground"
            >
              <Bell className="size-4" />
            </button>
          </div>
        </header>

        {/* 主内容 */}
        <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-6 sm:px-6 sm:py-8">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold tracking-tight text-foreground text-balance">
              创建训练任务
            </h1>
            <p className="mt-1 text-sm text-muted-foreground text-pretty">
              定义模型、数据与算力配置，平台将为你调度并运行这次训练。
            </p>
          </div>

          <CreateJob />
        </main>
      </div>
    </div>
  )
}
