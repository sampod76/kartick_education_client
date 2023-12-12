import React from "react";
import {
  FieldTimeOutlined,
  UsergroupDeleteOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Avatar, Card, Rate } from "antd";
import Image from "next/image";

const { Meta, Grid } = Card;

const SIngleCourse = ({ course }: { course: any }) => {
  const { name, description, img, video, jam, students } = course;
  return (
    <div>
      <Card
        className="w-full lg:w-[296px] bg-red-500"
        bodyStyle={{ borderRadius: "10px, 10px, 0px, 0px" }}
        cover={<Image className="max-h-[173px]" height={173} width={292} alt="example" src={img} />}
        hoverable
        headStyle={{
          // color:"red"
          position: "relative",
        }}
        actions={[
          <button key="video">
            <VideoCameraOutlined /> <span>{video.length} Video</span>
          </button>,
          <button key="time">
            <FieldTimeOutlined /> <span>{jam.length} Jam</span>
          </button>,
          <button key="users">
            <UsergroupDeleteOutlined />
            <span>{students.length} students</span>
          </button>,
        ]}
      >
        <Grid
          className="bg-primary height-[30px] text-[16px] width-[54px] rounded-2xl text-white font-semibold py-2"
          style={{
            position: "absolute",
            right: 16,
            bottom: 164,
            padding: 0,
            borderRadius:"10px"
          }}
        >
          <h2><Rate className="h-[12px]" count={1} value={1}/> 5.0</h2>
        </Grid>

        <Meta
          // avatar={
          //   <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />
          // }
          style={{
            fontSize: "16px",
            fontWeight: "500",
            textAlign: "start",
            margin: "24px 0",
            padding:"0 10px"

          }}
          title={<h2 className="text-black">{name}</h2>}
          description={<p className="text-[#282938] ">{description}</p>}
        />
      </Card>
    </div>
  );
};

export default SIngleCourse;
