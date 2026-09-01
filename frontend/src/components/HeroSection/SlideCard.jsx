import StarIcon from "@mui/icons-material/Star";

const SlideCard = ({ item}) => {
  return (
    <section className="flex-none w-full flex justify-center items-center transition-transform ease-out duration-200 ">
      <div className=" w-full flex-col sm:flex-row  flex justify-center items-center bg-[var(--neutralblack)] border border-[var(--secondarycolor)]  relative rounded-2xl  mx-4">
        <div className="w-full flex-1 ">
          <img
            src={item}
            alt="heroImg"
            className="w-full h-[320px]   bg-cover bg-center object-cover rounded-2xl sm:rounded-tl-2xl sm:rounded-bl-2xl"
            loading="lazy"
          />
        </div>
        <div className="flex-1 flex flex-col text-white sm:static sm:text-[var(--primarytext)] gap-2 p-4 justify-center items-start sm:flex-col   absolute top-0 bottom-0 right-0 left-0">
          <h3 className="text-xl font-semibold">FoodLux</h3>
          <h2 className="text-5xl font-bold">Chicken Chopri</h2>
          <h3 className="text-xl font-medium text-white  bg-green-600 p-2">
            {" "}
            <StarIcon /> <span>5 star</span>
          </h3>
          <p className="font-thin text-sm py-2 hidden sm:block">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Consequuntur repudiandae facilis repellat quaerat voluptate
            doloremque. Nostrum, eligendi consectetur nobis, sequi voluptates
            repellat sed at odio cumque sunt ab veniam ipsa, itaque beatae
            dolorum.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SlideCard;
