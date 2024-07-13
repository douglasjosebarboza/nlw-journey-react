import { Calendar, Tag, X } from "lucide-react";
import { Button } from "../../components/button";
import { Modal } from "../../components/modal";
import { Input } from "../../components/input";
import { FormEvent } from "react";
import { api } from "../../lib/axios";
import { useParams } from "react-router-dom";

interface CreateActivityModalProps {
  closeCreateActivityModal: () => void;
}

export function CreateActivityModal({
  closeCreateActivityModal,
}: CreateActivityModalProps) {
  const { tripId } = useParams();

  async function createActivity(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const title = data.get("title")?.toString();
    const occursAt = data.get("occurs_at")?.toString();

    await api.post(`/trips/${tripId}/activities`, {
      title,
      occurs_at: occursAt,
    });

    window.document.location.reload();
  }
  return (
    <Modal>
      <div className="w-[648px] space-y-5 rounded-lg bg-zinc-900 px-6 py-5 shadow-shape">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Cadastrar atividade</h2>
            <button>
              <X
                onClick={closeCreateActivityModal}
                className="size-5 text-zinc-400"
              />
            </button>
          </div>
          <p className="text-sm text-zinc-400">
            Todos os convidados podem visualizar as atividades
          </p>
        </div>

        <form onSubmit={createActivity} className="space-y-3">
          <div className="flex h-14 flex-1 items-center gap-2 rounded-lg border-zinc-800 bg-zinc-950 px-4">
            <Tag className="size-5 text-zinc-400" />

            <Input type="text" name="title" placeholder="Qual a atividade?" />
          </div>

          <div className="flex items-center gap-2">
            <div className="flex h-14 flex-1 items-center gap-2 rounded-lg border-zinc-800 bg-zinc-950 px-4">
              <Calendar className="size-5 text-zinc-400" />

              <Input type="datetime-local" name="occurs_at" />
            </div>
          </div>

          <Button variant="primary" size="full">
            Salvar atividade
          </Button>
        </form>
      </div>
    </Modal>
  );
}
