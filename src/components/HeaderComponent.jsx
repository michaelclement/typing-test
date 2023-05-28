export default function Header() {
  return (
    <>
      <header className="flex flex-row justify-between bg-zinc-400 p-[5px]">
        <div>
          {/* TODO: Logo here */}
          <h1 className="text-2xl font-bold text-zinc-900">Typing Test</h1>
        </div>
        <div>
          {/* TODO: image of a gear here */}
          <button className="rounded border-2 border-zinc-900 px-[5px] font-bold hover:opacity-50 duration-200">Settings</button>
        </div>
      </header>
    </>
  )
}