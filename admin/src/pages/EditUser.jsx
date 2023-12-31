import { Helmet, HelmetProvider } from "react-helmet-async";
import customFetch from "../utils/customFetch.js";
import styled from "styled-components";
import { redirect, useNavigation, useLoaderData } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";

const Wrapper = styled.div`
  width: 100%;
  height: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .title {
    width: 1100px;
    text-align: left;
    font-size: 2rem;
    font-weight: bold;
    color: #00193b;
    margin-bottom: 1rem;
  }

  .user-container {
    display: flex;
    justify-content: center;
    gap: 2rem;
    width: 1100px;
    height: 100%;
  }
  .user-details {
    width: 40%;
    height: 500px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    background-color: white;
    box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.1),
      0 2px 6px 2px rgba(60, 64, 67, 0.15);
    border-color: #f1f1f1;
    border-radius: 10px;
    padding: 1.2rem 1rem;
  }
  .user-orders {
    width: 60%;
    height: 500px;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background-color: white;
    box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.1),
      0 2px 6px 2px rgba(60, 64, 67, 0.15);
    border-color: #f1f1f1;
    border-radius: 10px;
    padding: 1rem;
  }

  .flex-column {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
`;

export const action = async ({ request, params }) => {
  const { id } = params;
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.patch(`/user/update-user/${id}`, data);
    return redirect("/all-user");
  } catch (error) {
    return error;
  }
};

export const loader = async ({ params }) => {
  try {
    const { id } = params;
    if (!id) {
      return redirect("/all-user");
    }
    const user = await customFetch
      .get(`/user/single-user/${id}`)
      .then(({ data }) => data.user);

    const orders = await customFetch
      .get(`/order/?userId=${user._id}`)
      .then(({ data }) => data.orders);
    return { user, orders };
  } catch (error) {
    return error;
  }
};

const EditUser = () => {
  const { user, orders } = useLoaderData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <HelmetProvider>
      <Wrapper>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Edit User</title>
        </Helmet>

        <div className="title">{user.fullName}</div>
        <div className="user-container">
          <div className="user-details">
            <Avatar
              sx={{
                width: 100,
                height: 100,
                backgroundColor: "white",
                color: "black",
                border: "1px solid black",
              }}
              src={user.avatar && user.avatar}
            >
              {!user.avatar && user.fullName.charAt(0).toUpperCase()}
            </Avatar>
            <div style={{ fontWeight: "bold" }}>{user?.fullName}</div>
            <div>{user?.email}</div>
            <div>{user?.phone}</div>
            <div
              style={{ width: "80%", textAlign: "center" }}
            >{`${user?.address.city}, ${user?.address.district}, ${user?.address.ward}, ${user?.address.home}`}</div>

            <div className="flex-column" style={{ width: "100%", gap: "1rem" }}>
              <Divider sx={{ m: "1rem 0" }} />
              <div className="flex-column">
                <span style={{ fontWeight: "bold" }}>Last Order</span>
                <span style={{ color: "#6c757d", fontSize: "0.9rem" }}>
                  {orders && orders.length && "#" + orders[0]._id.slice(18)}
                </span>
              </div>
              <div className="flex-column">
                <span style={{ fontWeight: "bold" }}>Total Spent</span>
                <span style={{ color: "#6c757d", fontSize: "0.9rem" }}>
                  {orders &&
                    orders.length &&
                    orders.reduce((acc, item) => acc + item.totalPrice, 0) +
                      "₫"}
                </span>
              </div>
              <div className="flex-column">
                <span style={{ fontWeight: "bold" }}>Registered</span>
                <span style={{ color: "#6c757d", fontSize: "0.9rem" }}>
                  {user.createdAt.split("T")[0]}
                </span>
              </div>
            </div>
          </div>

          <div className="user-orders">
            <div style={{ fontWeight: "bold", fontSize: "1.2rem" }}>Orders</div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.8rem",
                height: "90%",
                overflow: "auto",
              }}
            >
              {orders &&
                orders.length &&
                orders.map((order) => {
                  return (
                    <div
                      key={order._id}
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 2fr 2fr 1fr 1fr",
                        gap: "1rem",
                      }}
                    >
                      <div>{"#" + order._id.slice(18)}</div>
                      <div>{order.createdAt.split("T")[0]}</div>
                      <div>{order.orderStatus}</div>
                      <div>
                        {order.products.reduce(
                          (acc, item) => acc + item.count,
                          0
                        ) + " sp"}
                      </div>
                      <div>{order.totalPrice.toFixed(0) + "₫"}</div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>

        {/* <Form method="post" className="form-login">
          <FormRow type="text" name="fullName" defaultValue={user?.fullName} />
          <FormRow type="email" name="email" defaultValue={user?.email} />
          <FormRow type="text" name="phone" defaultValue={user?.phone} />
          <FormRow type="text" name="address" defaultValue={user?.address} />
          <FormRow type="text" name="gender" defaultValue={user?.gender} />
          <FormRow type="text" name="role" defaultValue={user?.role} />
          <FormRow
            type="text"
            name="isBlocked"
            defaultValue={user?.isBlocked}
          />
          <button type="submit" className="btn-block" disabled={isSubmitting}>
            {isSubmitting ? "Editing..." : "Edit"}
          </button>
        </Form> */}
      </Wrapper>
    </HelmetProvider>
  );
};

export default EditUser;
