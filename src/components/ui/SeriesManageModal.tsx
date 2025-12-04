import {
  Button,
  Label,
  ListGroup,
  ListGroupItem,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Textarea,
  TextInput,
} from "flowbite-react";
import type React from "react";
import { useEffect, useState, type FormEvent } from "react";
import { createSeries, deleteSeries, getAllSeries } from "../../api/SeriesApi";
import type { SeriesResponse } from "../../types/Series";
import { handleError, handleSuccess } from "../../utils/notifier";

interface SeriesManageModalProps {
  onClose: () => void;
}

const SeriesManageModal: React.FC<SeriesManageModalProps> = ({ onClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [allSeries, setAllSeries] = useState<SeriesResponse[]>([]);

  const fetchAllSeries = async () => {
    try {
      const data = await getAllSeries();

      setAllSeries(data);
    } catch (err) {
      handleError(err);
    }
  };

  useEffect(() => {
    fetchAllSeries();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      handleError(new Error("시리즈 제목은 필수입니다."));
    }

    const newSeries = {
      title,
      description,
    };

    try {
      const data = await createSeries(newSeries);

      handleSuccess(`시리즈 등록완료: [${data.seriesId}]`, () => {
        setTitle("");
        setDescription("");
        fetchAllSeries();
      });
    } catch (err) {
      handleError(err);
    }
  };

  const handleDelete = async (seriesId: number) => {
    try {
      await deleteSeries(seriesId);
      handleSuccess(`시리즈 삭제완료: [${seriesId}]`, () => {
        fetchAllSeries();
      });
    } catch (err) {
      handleError(err);
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(e.target.value);
  };

  return (
    <Modal show={true} onClose={onClose} size="lg">
      <ModalHeader className="text-lg p-4">시리즈 관리</ModalHeader>

      <ModalBody>
        <div className="space-y-2">
          {/* 등록 폼 */}
          <section>
            <div className="flex items-center gap-4 mb-2">
              <div className="w-18 shrink-0">
                <Label htmlFor="title">제목 (필수)</Label>
              </div>
              <div className="flex-1">
                <TextInput
                  id="title"
                  type="text"
                  value={title}
                  onChange={handleTitleChange}
                  placeholder="제목 (필수)"
                  required
                />
              </div>
            </div>
            <div className="flex items-center gap-4 mb-2">
              <div className="w-18 shrink-0">
                <Label htmlFor="description">개요</Label>
              </div>
              <Textarea
                id="description"
                onChange={handleDescriptionChange}
                value={description}
                rows={3}
              />
            </div>
            <div className="flex justify-end">
              <Button
                size="xs"
                type="submit"
                color="blue"
                onClick={handleSubmit}
              >
                신규 등록
              </Button>
            </div>
          </section>

          <hr className="my-4 border-gray-700 dark:border-gray-500" />

          <section>
            <h3 className="font-medium mb-3 dark:text-white">
              목록 총 [{allSeries.length ?? 0}] 건
            </h3>
            <div className="max-h-60 overflow-y-auto">
              <ListGroup>
                {allSeries.length !== 0 ? (
                  allSeries.map((series) => (
                    <ListGroupItem key={series.seriesId} className="p-1">
                      <div className="flex justify-between items-center w-full">
                        <div className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          <span>[{series.seriesId}] - </span>
                          {series.title}
                        </div>
                        <Button
                          color="red"
                          size="xs"
                          onClick={() => handleDelete(series.seriesId)}
                        >
                          삭제
                        </Button>
                      </div>
                    </ListGroupItem>
                  ))
                ) : (
                  // allSeries.map((series: SeriesResponse) => series.title)
                  <ListGroupItem className="text-center text-gray-500 text-sm">
                    등록된 시리즈가 없습니다.
                  </ListGroupItem>
                )}
              </ListGroup>
            </div>
          </section>
        </div>
      </ModalBody>

      <ModalFooter className="flex justify-end p-3">
        <Button color="alternative" size="sm" onClick={onClose}>
          닫기
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default SeriesManageModal;
