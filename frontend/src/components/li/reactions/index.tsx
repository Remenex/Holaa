import ReactionItem from "@/components/lib/reaction-item";

export default function Reactions() {
  return (
    <div className="flex flex-wrap pt-5">
      <ReactionItem
        reaction={true}
        image="reaction1.png"
        title="Interstellar"
        genre="Naucna fantastika"
        year={2014}
      />
      <ReactionItem
        reaction={false}
        image="reaction2.png"
        title="Interstellar"
        genre="Naucna fantastika"
        year={2014}
      />
      <ReactionItem
        reaction={false}
        image="reaction3.png"
        title="Interstellar"
        genre="Naucna fantastika"
        year={2014}
      />
      <ReactionItem
        reaction={true}
        image="reaction4.png"
        title="Interstellar"
        genre="Naucna fantastika"
        year={2014}
      />
      <ReactionItem
        reaction={true}
        image="reaction1.png"
        title="Interstellar"
        genre="Naucna fantastika"
        year={2014}
      />
      <ReactionItem
        reaction={false}
        image="reaction2.png"
        title="Interstellar"
        genre="Naucna fantastika"
        year={2014}
      />
      <ReactionItem
        reaction={false}
        image="reaction3.png"
        title="Interstellar"
        genre="Naucna fantastika"
        year={2014}
      />
      <ReactionItem
        reaction={true}
        image="reaction4.png"
        title="Interstellar"
        genre="Naucna fantastika"
        year={2014}
      />
    </div>
  );
}
