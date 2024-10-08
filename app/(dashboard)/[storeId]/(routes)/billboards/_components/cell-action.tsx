"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import axios from 'axios'
import toast from "react-hot-toast"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react"
import { BillboardColumn } from "./columns"

import AlertModal from "@/components/models/alert-modal"

interface CellActionProps {
    data: BillboardColumn
}
export default function CellAction({ data }: CellActionProps) {
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const router = useRouter();
    const params = useParams();

    const onCopy = (id: string) => {
        navigator.clipboard.writeText(id);
        toast.success("API route copied to the clipboard.")
    }

    const onDelete = async () => {
        try {
            setLoading(true)
            await axios.delete(`/api/${params.storeId}/billboards/${data.id}`)
            router.refresh()
            toast.success("Billboard deleted")
        } catch (error: any) {
            toast.error("Make sure you remove all store categories using this billboard.")
        } finally {
            setLoading(false)
            setOpen(false)
        }
    }

    return (
        <>
            <AlertModal
                isOpen={open}
                onClose={() => setOpen(false)}
                loading={loading}
                onConfirm={onDelete}
            />
            <DropdownMenu >
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>
                        Actions
                    </DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => { router.push(`/${params.storeId}/billboards/${data.id}`) }}>
                        <Edit className="mr-2 h-4 w-4" />
                        Update
                    </DropdownMenuItem>

                    <DropdownMenuItem onClick={() => onCopy(data.id)}>
                        <Copy className="mr-2 h-4 w-4" />
                        Copy ID
                    </DropdownMenuItem>

                    <DropdownMenuItem onClick={() => setOpen(true)}>
                        <Trash className="mr-2 h-4 w-4" />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}
