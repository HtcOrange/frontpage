'use client'

import { useState } from 'react'
import {
  Database,
  Cpu,
  Check,
  Info,
  Rocket,
  Save,
} from 'lucide-react'
import { Button } from '@/components/ui/button'

const frameworks = ['PyTorch', 'TensorFlow', 'JAX'] as const

const baseModels = [
  { id: 'resnet50', label: 'ResNet-50', tag: '视觉分类' },
  { id: 'llama3-8b', label: 'Llama 3 · 8B', tag: '大语言模型' },
  { id: 'bert-base', label: 'BERT-base', tag: '文本理解' },
  { id: 'whisper-s', label: 'Whisper-small', tag: '语音识别' },
]

const datasets = [
  { id: 'imagenet', name: 'ImageNet-1K', size: '1.28M 图像 · 142 GB' },
  { id: 'wikitext', name: 'WikiText-103', size: '103M tokens · 0.5 GB' },
  { id: 'custom', name: 'my-labeled-set', size: '84K 样本 · 6.3 GB' },
]

const gpus = [
  { id: 'a100', name: 'NVIDIA A100', mem: '80 GB', price: 12.8 },
  { id: 'h100', name: 'NVIDIA H100', mem: '80 GB', price: 24.5 },
  { id: 'l4', name: 'NVIDIA L4', mem: '24 GB', price: 4.2 },
]

const optimizers = ['AdamW', 'SGD', 'Adam', 'Lion'] as const

export function CreateJob() {
  const [name, setName] = useState('image-cls-experiment-01')
  const [description, setDescription] = useState('')
  const [framework, setFramework] = useState<(typeof frameworks)[number]>('PyTorch')
  const [baseModel, setBaseModel] = useState('resnet50')
  const [dataset, setDataset] = useState('imagenet')
  const [optimizer, setOptimizer] = useState<(typeof optimizers)[number]>('AdamW')
  const [lr, setLr] = useState('0.001')
  const [batchSize, setBatchSize] = useState('128')
  const [epochs, setEpochs] = useState(50)
  const [gpu, setGpu] = useState('a100')
  const [gpuCount, setGpuCount] = useState(2)

  const selectedGpu = gpus.find((g) => g.id === gpu)!
  const estPerHour = selectedGpu.price * gpuCount
  const estHours = Math.round((epochs * gpuCount * 0.4 + 2) * 10) / 10
  const estTotal = Math.round(estPerHour * estHours)

  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_320px]">
      {/* 表单主体 */}
      <div className="flex flex-col gap-6">
        {/* 基本信息 */}
        <Section
          index="01"
          title="任务基本信息"
          desc="为你的训练任务命名并添加描述，便于后续检索与协作。"
        >
          <Field label="任务名称" required>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border border-input bg-card px-3 py-2 font-mono text-sm outline-none transition-colors focus:border-ring focus:ring-3 focus:ring-ring/20"
              placeholder="my-training-job"
            />
          </Field>
          <Field label="描述" hint="可选">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full resize-none rounded-lg border border-input bg-card px-3 py-2 text-sm outline-none transition-colors focus:border-ring focus:ring-3 focus:ring-ring/20"
              placeholder="描述本次训练的目标、数据变更或超参调整……"
            />
          </Field>
        </Section>

        {/* 模型与框架 */}
        <Section
          index="02"
          title="模型与框架"
          desc="选择训练框架和基础模型，作为本次任务的起点。"
        >
          <Field label="训练框架">
            <div className="flex flex-wrap gap-2">
              {frameworks.map((f) => (
                <Chip key={f} active={framework === f} onClick={() => setFramework(f)}>
                  {f}
                </Chip>
              ))}
            </div>
          </Field>
          <Field label="基础模型">
            <div className="grid gap-2 sm:grid-cols-2">
              {baseModels.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setBaseModel(m.id)}
                  className={
                    'flex items-center justify-between rounded-lg border px-3 py-2.5 text-left transition-colors ' +
                    (baseModel === m.id
                      ? 'border-primary bg-accent'
                      : 'border-border bg-card hover:border-ring/40')
                  }
                >
                  <span className="flex flex-col">
                    <span className="text-sm font-medium text-foreground">{m.label}</span>
                    <span className="text-xs text-muted-foreground">{m.tag}</span>
                  </span>
                  {baseModel === m.id && <Check className="size-4 text-primary" />}
                </button>
              ))}
            </div>
          </Field>
        </Section>

        {/* 数据集 */}
        <Section
          index="03"
          title="数据集"
          desc="选择用于训练的数据集，平台将自动挂载至训练环境。"
        >
          <div className="flex flex-col gap-2">
            {datasets.map((d) => (
              <button
                key={d.id}
                type="button"
                onClick={() => setDataset(d.id)}
                className={
                  'flex items-center gap-3 rounded-lg border px-3 py-3 text-left transition-colors ' +
                  (dataset === d.id
                    ? 'border-primary bg-accent'
                    : 'border-border bg-card hover:border-ring/40')
                }
              >
                <span
                  className={
                    'flex size-9 items-center justify-center rounded-lg ' +
                    (dataset === d.id
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground')
                  }
                >
                  <Database className="size-4" />
                </span>
                <span className="flex flex-1 flex-col">
                  <span className="font-mono text-sm font-medium text-foreground">{d.name}</span>
                  <span className="text-xs text-muted-foreground">{d.size}</span>
                </span>
                {dataset === d.id && <Check className="size-4 text-primary" />}
              </button>
            ))}
          </div>
        </Section>

        {/* 超参数 */}
        <Section
          index="04"
          title="超参数配置"
          desc="调整学习率、批大小与训练轮数等核心超参数。"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="学习率 (Learning Rate)">
              <input
                value={lr}
                onChange={(e) => setLr(e.target.value)}
                className="w-full rounded-lg border border-input bg-card px-3 py-2 font-mono text-sm outline-none transition-colors focus:border-ring focus:ring-3 focus:ring-ring/20"
              />
            </Field>
            <Field label="批大小 (Batch Size)">
              <input
                value={batchSize}
                onChange={(e) => setBatchSize(e.target.value)}
                className="w-full rounded-lg border border-input bg-card px-3 py-2 font-mono text-sm outline-none transition-colors focus:border-ring focus:ring-3 focus:ring-ring/20"
              />
            </Field>
            <Field label="优化器 (Optimizer)">
              <div className="flex flex-wrap gap-2">
                {optimizers.map((o) => (
                  <Chip key={o} active={optimizer === o} onClick={() => setOptimizer(o)}>
                    {o}
                  </Chip>
                ))}
              </div>
            </Field>
            <Field label={`训练轮数 (Epochs) · ${epochs}`}>
              <input
                type="range"
                min={1}
                max={200}
                value={epochs}
                onChange={(e) => setEpochs(Number(e.target.value))}
                className="mt-2 w-full accent-primary"
              />
            </Field>
          </div>
        </Section>

        {/* 计算资源 */}
        <Section
          index="05"
          title="计算资源"
          desc="选择 GPU 类型与数量，平台按用量计费。"
        >
          <Field label="GPU 类型">
            <div className="grid gap-2 sm:grid-cols-3">
              {gpus.map((g) => (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => setGpu(g.id)}
                  className={
                    'flex flex-col gap-1 rounded-lg border px-3 py-3 text-left transition-colors ' +
                    (gpu === g.id
                      ? 'border-primary bg-accent'
                      : 'border-border bg-card hover:border-ring/40')
                  }
                >
                  <span className="flex items-center gap-2 text-sm font-medium text-foreground">
                    <Cpu className="size-4 text-muted-foreground" />
                    {g.name}
                  </span>
                  <span className="text-xs text-muted-foreground">{g.mem} 显存</span>
                  <span className="font-mono text-xs text-primary">¥{g.price}/卡·时</span>
                </button>
              ))}
            </div>
          </Field>
          <Field label={`GPU 数量 · ${gpuCount} 卡`}>
            <input
              type="range"
              min={1}
              max={8}
              value={gpuCount}
              onChange={(e) => setGpuCount(Number(e.target.value))}
              className="mt-2 w-full accent-primary"
            />
          </Field>
        </Section>
      </div>

      {/* 摘要侧栏 */}
      <div className="xl:sticky xl:top-6 xl:self-start">
        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="text-sm font-semibold text-foreground">任务摘要</h3>
          <p className="mt-0.5 text-xs text-muted-foreground">提交前请确认以下配置</p>

          <dl className="mt-4 flex flex-col gap-3 text-sm">
            <SummaryRow label="框架" value={framework} />
            <SummaryRow
              label="基础模型"
              value={baseModels.find((m) => m.id === baseModel)?.label ?? '-'}
            />
            <SummaryRow
              label="数据集"
              value={datasets.find((d) => d.id === dataset)?.name ?? '-'}
              mono
            />
            <SummaryRow label="优化器" value={optimizer} />
            <SummaryRow label="学习率" value={lr} mono />
            <SummaryRow label="Epochs" value={String(epochs)} mono />
            <SummaryRow label="算力" value={`${gpuCount} × ${selectedGpu.name}`} />
          </dl>

          <div className="mt-4 rounded-lg border border-border bg-muted/50 p-3">
            <div className="flex items-baseline justify-between">
              <span className="text-xs text-muted-foreground">预计时长</span>
              <span className="font-mono text-sm font-medium text-foreground">
                ~{estHours} 小时
              </span>
            </div>
            <div className="mt-1.5 flex items-baseline justify-between">
              <span className="text-xs text-muted-foreground">预计费用</span>
              <span className="font-mono text-lg font-semibold text-foreground">
                ¥{estTotal.toLocaleString()}
              </span>
            </div>
            <p className="mt-1 font-mono text-[11px] text-muted-foreground">
              ¥{estPerHour.toFixed(1)}/时 · 估算值
            </p>
          </div>

          <Button className="mt-4 h-9 w-full">
            <Rocket className="size-4" />
            提交训练任务
          </Button>
          <Button variant="outline" className="mt-2 h-9 w-full">
            <Save className="size-4" />
            保存为草稿
          </Button>

          <p className="mt-3 flex items-start gap-1.5 text-[11px] leading-relaxed text-muted-foreground">
            <Info className="mt-px size-3.5 shrink-0" />
            提交后任务将进入调度队列，可在「训练任务」列表中查看实时日志与指标。
          </p>
        </div>
      </div>
    </div>
  )
}

function Section({
  index,
  title,
  desc,
  children,
}: {
  index: string
  title: string
  desc: string
  children: React.ReactNode
}) {
  return (
    <section className="rounded-xl border border-border bg-card p-5 sm:p-6">
      <div className="mb-5 flex items-start gap-3">
        <span className="mt-0.5 font-mono text-xs font-medium text-muted-foreground">
          {index}
        </span>
        <div>
          <h2 className="text-base font-semibold text-foreground text-balance">{title}</h2>
          <p className="mt-0.5 text-sm text-muted-foreground text-pretty">{desc}</p>
        </div>
      </div>
      <div className="flex flex-col gap-4 pl-0 sm:pl-7">{children}</div>
    </section>
  )
}

function Field({
  label,
  hint,
  required,
  children,
}: {
  label: string
  hint?: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="flex items-center gap-1.5 text-sm font-medium text-foreground">
        {label}
        {required && <span className="text-destructive">*</span>}
        {hint && <span className="text-xs font-normal text-muted-foreground">{hint}</span>}
      </label>
      {children}
    </div>
  )
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        'rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors ' +
        (active
          ? 'border-primary bg-primary text-primary-foreground'
          : 'border-border bg-card text-muted-foreground hover:border-ring/40 hover:text-foreground')
      }
    >
      {children}
    </button>
  )
}

function SummaryRow({
  label,
  value,
  mono,
}: {
  label: string
  value: string
  mono?: boolean
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd
        className={
          'truncate text-right text-sm font-medium text-foreground ' + (mono ? 'font-mono' : '')
        }
      >
        {value}
      </dd>
    </div>
  )
}
