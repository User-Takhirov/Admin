import { Button, Flex, message, Table, Image, Popconfirm } from "antd";
import { Link, useParams } from "react-router-dom";
import { columnType, Datas } from "../../Types/data-types";
import { useQueryClient } from "@tanstack/react-query";
import { uesGetProductVariants } from "../../Service/Query/uesGetProductVariants";
import { useProductVariantsDelete } from "../../Service/Mutation/useProductVariantsDelete";
import { useGetProducts } from "../../Service/Query/useGetProducts";
export const ProductVariants = () => {
  const { data } = uesGetProductVariants();
  const { id } = useParams();
  const { data: hero } = useGetProducts();

  const heroCategory = hero?.results.find(
    (item: any) => item.id === Number(id)
  )?.category;

  const dataSource = data?.results.map((item: Datas) => {
    return {
      key: item.id,
      id: item.id,
      img: item.image,
      title: item.title,
    };
  });

  const { mutate } = useProductVariantsDelete();

  const client = useQueryClient();
  const DeleteCategory = (id: number) => {
    mutate(id, {
      onSuccess: () => {
        message.success("success");
        client.invalidateQueries({ queryKey: ["get-data"] });
      },
      onError: (error) => {
        console.log(error);

        message.error("error");
      },
    });
  };

  const columns: columnType[] = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: "40px",
    },
    {
      title: "Image",
      dataIndex: "img",
      align: "center",
      key: "image",
      render: (image: string) => (
        <div style={{ textAlign: "center" }}>
          <Image
            style={{
              width: "70px",
            }}
            src={image}
            alt="#"
          />
        </div>
      ),
    },
    {
      title: "Name",
      dataIndex: "title",
      key: "title",
      align: "center",
      render: (title: string) => (
        <div style={{ textAlign: "center" }}>
          <h3 style={{ fontSize: "20px", fontWeight: "600" }}>{title}</h3>
        </div>
      ),
    },
    {
      title: "Change",
      dataIndex: "change",
      key: "action",
      align: "center",
      width: "25%",
      render: (_: any, record: Datas) => (
        <Flex gap={"20px"} justify="center">
          <div>
            <Link to={`/app/edit-category/${record.id}`}>
              <Button type="primary" style={{ backgroundColor: "#f1cf0f" }}>
                Edit
              </Button>
            </Link>
          </div>
          <div>
            <Popconfirm
              onConfirm={() => {
                return DeleteCategory(record.id);
              }}
              cancelText={"No"}
              okText={"Yes"}
              title={"Do you wish to continue with past date?"}
            >
              <Button type="primary" style={{ backgroundColor: "red" }}>
                Delete
              </Button>
            </Popconfirm>
          </div>
        </Flex>
      ),
    },
  ];

  return (
    <>
      <div style={{ marginBottom: "20px" }}>
        <Link to={`/app/product/variants/${id}/${heroCategory}/create`}>
          <Button type="primary">Create</Button>
        </Link>
      </div>
      <Table dataSource={dataSource} columns={columns} bordered size="large" />
    </>
  );
};