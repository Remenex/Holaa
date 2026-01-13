import ReactionItem from "@/components/lib/reaction-item";

type Props = {
  reactions?: Reaction[];
};

export default function Reactions({ reactions }: Props) {
  return (
    <div className="flex flex-wrap pt-5">
      {reactions &&
        reactions.map((r) => <ReactionItem key={Math.random()} reaction={r} />)}
    </div>
  );
}
