using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Models.Domain.Location;
using Sabio.Models.Requests.Locations;
using System.Collections.Generic;

namespace Sabio.Services
{
    public interface ILocationsService
    {
        int Add(LocationAddRequest model, int userId);
        int AddByCustomer(LocationByCustomerAddRequest model, int userId);
        int AddByContact(LocationByContactAddRequest model, int userId);
        void Delete(int id);
        Location Get(int id);
        List<Location> GetByCustomerId(int customerId);
        List<Location> GetByContactId(int contactId);
        Paged<Location> GetAll(int pageIndex, int pageSize, int userId);
        List<State> GetAllStates();
        void Update(LocationUpdateRequest model, int userId);

    }
}