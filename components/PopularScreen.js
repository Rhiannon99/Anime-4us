import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import URL from "../url";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import { StarIcon, CollectionIcon } from "@heroicons/react/outline";
import styles from "../styles/Screens.module.css";

const PopularScreen = (props) => {
  const [popularItems, addNewPopularItems] = useState(props.data);
  const [pageNo1, incrPageNo1] = useState(2);

  const getNewPopularItems = async () => {
    let popular = await fetch(`${URL}/api/popular?pageNo=${pageNo1}`);
    popular = await popular.json();

    addNewPopularItems(popularItems.concat(popular));
    incrPageNo1(pageNo1 + 1);
  };

  return (
    <div>
      <Row lg={5} xs={2} md={3}>
        {popularItems.map(
          ({
            title,
            coverImage,
            season,
            seasonYear,
            episodes,
            meanScore,
            id,
          }) => (
            <Col key={id} className="pb-4 px-2">
              <Link href={`/animeInfo/${id}`} passHref>
                <div className={styles.anime_card}>
                  <Image
                    src={coverImage.extraLarge}
                    alt=""
                    width={300}
                    height={430}
                    className={styles.image}
                  />
                  <div className="text-white align-items-center p-2">
                    <h6 className="mb-1">{title.userPreferred}</h6>
                    <p className="mb-0">
                      <StarIcon className={styles.starIcon} /> {meanScore / 10}
                    </p>
                    <p className="mb-0">
                      <CollectionIcon className={styles.collectionIcon} />{" "}
                      {episodes}
                    </p>
                    <p className="text-muted">
                      {season} {seasonYear}
                    </p>
                  </div>
                </div>
              </Link>
            </Col>
          )
        )}
      </Row>
      <Button variant="danger" onClick={getNewPopularItems}>
        Load more
      </Button>
    </div>
  );
};

export default PopularScreen;
