import { ColumnDef } from "@tanstack/react-table";
import { ChevronUp as ArrowUp } from "lucide-react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Message = {
  id: string;
  time: string;
  phone: string;
  content: string;
  status: string;
};

const dlrCodes = {
  "1": "Delivered",
  "2": "Non-Delivered to Phone",
  "4": "Queued on SMSC",
  "8": "Delivered",
  "16": "Non-Delivered to SMSC.",
  "17": "Invalid Format",
  "18": "Failed",
};

export const columns: ColumnDef<Message>[] = [
  {
    accessorKey: "id",
    header: "Sl. No",
    cell: (props) => <p>{props.row.index + 1}</p>,
  },
  {
    accessorKey: "time",
    header: ({ column }) => {
      return (
        <div
          className="flex items-center gap-1 cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Time
          <ArrowUp
            className={`transition-all duration-300 ${column.getIsSorted() === "asc" ? "rotate-0" : column.getIsSorted() === "desc" ? "rotate-180" : "opacity-0"}`}
          />
        </div>
      );
    },
    cell(props) {
      return new Date(props.getValue() as string).toString().split("GMT")[0];
    },
  },
  {
    accessorKey: "sender",
    header: ({ column }) => {
      return (
        <div
          className="flex items-center gap-1 cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Sender
          <ArrowUp
            className={`transition-all duration-300 ${column.getIsSorted() === "asc" ? "rotate-0" : column.getIsSorted() === "desc" ? "rotate-180" : "opacity-0"}`}
          />
        </div>
      );
    },
  },
  {
    accessorKey: "phone",
    header: ({ column }) => {
      return (
        <div
          className="flex items-center gap-1 cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Phone
          <ArrowUp
            className={`transition-all duration-300 ${column.getIsSorted() === "asc" ? "rotate-0" : column.getIsSorted() === "desc" ? "rotate-180" : "opacity-0"}`}
          />
        </div>
      );
    },
  },
  {
    accessorKey: "content",
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    header: ({ column }) => {
      return (
        <div
          className="flex items-center gap-1 cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Message
          {/* {column.getIsSorted() === "asc" ? (
            <ArrowDown />
          ) : column.getIsSorted() === "desc" ? (
            <ArrowUp />
          ) : null} */}
          <ArrowUp
            className={`transition-all duration-300 ${column.getIsSorted() === "asc" ? "rotate-0" : column.getIsSorted() === "desc" ? "rotate-180" : "opacity-0"}`}
          />
        </div>
      );
    },
    cell(props) {
      return (
        <div className="flex-1 w-[400px]">{props.getValue() as string}</div>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <div
          className="flex items-center gap-1 cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          {/* {column.getIsSorted() === "asc" ? (
            <ArrowDown />
          ) : column.getIsSorted() === "desc" ? (
            <ArrowUp />
          ) : null} */}
          <ArrowUp
            className={`transition-all duration-300 ${column.getIsSorted() === "asc" ? "rotate-0" : column.getIsSorted() === "desc" ? "rotate-180" : "opacity-0"}`}
          />
        </div>
      );
    },
    filterFn: (row, id, value: string[]) => {
      console.log(value);

      if (value.includes("1")) {
        // value.push("8");
        return [...value, "8"].includes(row.getValue(id));
      }
      return value.includes(row.getValue(id));
      // return true;
    },
    cell(props) {
      return (
        <div className="flex-1 w-fit">
          {dlrCodes[props.getValue() as keyof typeof dlrCodes]}
        </div>
      );
    },
  },
  // {
  //   accessorKey: "pdf",
  //   header(props) {
  //     return;
  //   },
  //   cell(props) {
  //     return (
  //       <Button
  //         onClick={() => console.log(props.row.getVisibleCells()[0].getValue())}
  //       >
  //         Print PDF
  //       </Button>
  //     );
  //   },
  // },
];
