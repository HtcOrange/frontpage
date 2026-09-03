import {
  LayoutDashboard,
  Boxes,
  Database,
  Cpu,
  FlaskConical,
  Settings,
  BookOpen,
  Sparkles,
} from 'lucide-react'

const nav = [
  { label: '概览', icon: LayoutDashboard, active: false },
  { label: '训练任务', icon: FlaskConical, active: true },
  { label: '模型仓库', icon: Boxes, active: false },
  { label: '数据集', icon: Database, active: false },
  { label: '计算资源', icon: Cpu, active: false },
  { label: '文档', icon: BookOpen, active: false },
]

export function AppSidebar() {
  return (
    <aside className="hidden w-60 shrink-0 flex-col border-r border-sidebar-border bg-sidebar lg:flex">
      <div className="flex h-16 items-center gap-2.5 px-5">
        <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <Sparkles className="size-4" />
        </div>
        <div className="flex flex-col leading-none">
          <span className="text-sm font-semibold text-sidebar-foreground">Nova ML</span>
          <span className="text-xs text-muted-foreground">机器学习平台</span>
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-1 px-3 py-4">
        {nav.map((item) => {
          const Icon = item.icon
          return (
            <a
              key={item.label}
              href="#"
              aria-current={item.active ? 'page' : undefined}
              className={
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ' +
                (item.active
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                  : 'text-muted-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-foreground')
              }
            >
              <Icon className="size-4" />
              {item.label}
            </a>
          )
        })}
      </nav>

      <div className="border-t border-sidebar-border p-3">
        <a
          href="#"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-sidebar-accent/60 hover:text-sidebar-foreground"
        >
          <Settings className="size-4" />
          设置
        </a>
        <div className="mt-2 flex items-center gap-3 rounded-lg px-3 py-2">
          <div className="flex size-8 items-center justify-center rounded-full bg-accent text-xs font-semibold text-accent-foreground">
            LW
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-medium text-sidebar-foreground">李 · Wang</span>
            <span className="text-xs text-muted-foreground">算法工程师</span>
          </div>
        </div>
      </div>
    </aside>
  )
}
